async function simulateRCClient() {
    console.log('[RC] Client started');
  
    while (true) {
      try {
        const res = await fetch('/command');
        const { commands = [] } = await res.json();
  
        for (const cmd of commands) {
          console.log('[RC] Command:', cmd);
          const { command, payload } = cmd;
  
          let result = { status: 'ok', command };
  
          try {
            if (command === 'type') {
              document.getElementById(payload.selector).value = payload.text;
            } else if (command === 'click') {
              document.getElementById(payload.selector).click();
            } else if (command === 'wait') {
              await new Promise(r => setTimeout(r, payload.ms));
            } else if (command === 'assertText') {
              const actual = document.getElementById(payload.selector).innerText;
              if (actual !== payload.expected) {
                throw new Error(`Assertion failed: "${actual}" !== "${payload.expected}"`);
              }
            } else {
              throw new Error(`Unknown command: ${command}`);
            }
  
          } catch (err) {
            result = { status: 'error', command, message: err.message };
          }
  
          await fetch('/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
          });
        }
  
      } catch (e) {
        console.error('[RC] Error:', e);
      }
  
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  simulateRCClient();