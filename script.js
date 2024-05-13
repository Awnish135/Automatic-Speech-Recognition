        const startButton = document.getElementById('startButton');
        const output = document.getElementById('output');
        let recognition;

        // Check if browser supports speech recognition
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // Create speech recognition object
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

            // Set recognition parameters
            recognition.continuous = true;
            recognition.lang = 'en-US'; // Language setting

            // Event fired when speech recognition starts
            recognition.onstart = function() {
                output.innerHTML = 'Listening...';
            };

            // Event fired when speech recognition results are available
            recognition.onresult = function(event) {
                const transcript = event.results[event.results.length - 1][0].transcript;
                output.innerHTML = 'You said: ' + transcript;
            };

            // Event fired when speech recognition ends
            recognition.onend = function() {
                output.innerHTML += '<br>Speech recognition ended. Click the button to start again.';
            };

            // Event fired when an error occurs
            recognition.onerror = function(event) {
                output.innerHTML = 'Error occurred: ' + event.error;
            };

            // Event fired when no speech was detected
            recognition.onspeechend = function() {
                output.innerHTML += '<br>No speech detected. Click the button to start again.';
            };

            // Start listening when button is clicked
            startButton.addEventListener('click', function() {
                recognition.start();
            });
        } else {
            output.innerHTML = 'Speech recognition is not supported by your browser.';
        }