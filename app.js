// Opens one midterm topic from its two words. The words give, through PBKDF2, both the name of the topic's file and
// the key that decrypts it (AES-GCM); build.mjs makes the files the same way. Nothing is sent anywhere: the words stay
// in this browser (the address after # is never sent to the server).
(() => {
  const $ = (id) => document.getElementById(id);
  const salt = new TextEncoder().encode(document.body.dataset.salt);
  const iterations = Number(document.body.dataset.iterations);
  const STORE = 'plasma-midterm-words';
  const norm = (words) => words.normalize('NFKC').toLowerCase().replace(/[^a-z]+/g, ' ').trim();
  const hex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  const unb64 = (text) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
  const remember = (words) => { try { localStorage.setItem(STORE, words); } catch (e) { /* private mode */ } };
  const recall = () => { try { return localStorage.getItem(STORE) || ''; } catch (e) { return ''; } };
  const forget = () => { try { localStorage.removeItem(STORE); } catch (e) { /* private mode */ } };

  async function openTopic(words) {
    const subtle = crypto.subtle;
    const base = await subtle.importKey('raw', new TextEncoder().encode(words), 'PBKDF2', false, ['deriveBits']);
    const bits = new Uint8Array(await subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', salt, iterations}, base, 384));
    const res = await fetch(`k/${hex(bits.slice(0, 16))}.json`, {cache: 'no-store'});
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`the site answered ${res.status}`);
    const {iv, data} = await res.json();
    const key = await subtle.importKey('raw', bits.slice(16), 'AES-GCM', false, ['decrypt']);
    const plain = await subtle.decrypt({name: 'AES-GCM', iv: unb64(iv)}, key, unb64(data));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function say(text, bad) {
    $('msg').textContent = text;
    $('msg').className = 'msg' + (bad ? ' bad' : '');
  }

  function show(topic, words) {
    $('page').innerHTML = topic.html;
    $('page').hidden = false;
    $('again').hidden = false;
    $('door').hidden = true;
    document.title = `Topic ${topic.n} · ${topic.title.replace(/<[^>]+>/g, '')}`;
    history.replaceState(null, '', '#' + words.replace(/ /g, '-'));
    remember(words);
    window.scrollTo(0, 0);
  }

  async function attempt(raw, quiet) {
    const words = norm(raw);
    if (words.split(' ').length < 2) {
      if (!quiet) say('Two words, please, as you were given them.', true);
      return;
    }
    $('go').disabled = true;
    say('Opening…');
    try {
      const topic = await openTopic(words);
      if (topic) {
        say('');
        show(topic, words);
      } else {
        if (quiet) forget();
        say('No topic opens with these words. Check the spelling, or ask the instructor.', true);
      }
    } catch (e) {
      say(`Something went wrong: ${e.message}. Try again, or ask the instructor.`, true);
    } finally {
      $('go').disabled = false;
    }
  }

  $('form').addEventListener('submit', (event) => {
    event.preventDefault();
    attempt($('words').value, false);
  });
  $('close').addEventListener('click', () => {
    forget();
    history.replaceState(null, '', location.pathname);
    $('page').hidden = true;
    $('page').textContent = '';
    $('again').hidden = true;
    $('door').hidden = false;
    $('words').value = '';
    document.title = 'Midterm report · Plasma Physics';
    say('');
    $('words').focus();
  });

  if (!window.crypto || !crypto.subtle) {
    say('This browser cannot open the topics: use a current Chrome, Safari, Firefox or Edge.', true);
    $('go').disabled = true;
    return;
  }
  const start = decodeURIComponent(location.hash.slice(1)) || recall();
  if (start) {
    $('words').value = norm(start);
    attempt(start, true);
  } else {
    $('words').focus();
  }
})();
