// Audio Player Management
let currentAudioFile = null;

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Audio file loading
    const loadAudioBtn = document.getElementById('loadAudioBtn');
    const audioFileInput = document.getElementById('audioFileInput');

    loadAudioBtn.addEventListener('click', loadAudioFile);
    audioFileInput.addEventListener('change', handleFileSelection);

    // STT processing buttons
    document.getElementById('processStt1').addEventListener('click', () => processStt(1));
    document.getElementById('processStt2').addEventListener('click', () => processStt(2));
}

function handleFileSelection(event) {
    const file = event.target.files[0];
    if (file) {
        currentAudioFile = file;
    }
}

function loadAudioFile() {
    if (!currentAudioFile) {
        alert('Please select an audio file first');
        return;
    }

    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    const fileUrl = URL.createObjectURL(currentAudioFile);
    audioSource.src = fileUrl;
    audioPlayer.load();

    // Reset transcriptions and metrics
    resetUI();
}

function resetUI() {
    // Reset transcriptions
    document.getElementById('transcription1').innerHTML = '<p class="placeholder">Transcription will appear here...</p>';
    document.getElementById('transcription2').innerHTML = '<p class="placeholder">Transcription will appear here...</p>';

    // Reset metrics
    updateMetrics(1, 'Ready', '0ms', 'N/A');
    updateMetrics(2, 'Ready', '0ms', 'N/A');
}

function processStt(sttNumber) {
    if (!currentAudioFile) {
        alert('Please load an audio file first');
        return;
    }

    // Update status
    updateMetrics(sttNumber, 'Processing...', '0ms', 'N/A');

    // Simulate processing (replace with actual STT API calls)
    const startTime = Date.now();

    setTimeout(() => {
        const processingTime = Date.now() - startTime;

        // Mock transcription result
        const mockTranscription = generateMockTranscription(sttNumber);

        // Update UI
        displayTranscription(sttNumber, mockTranscription);
        updateMetrics(sttNumber, 'Completed', `${processingTime}ms`, calculateMockAccuracy(sttNumber));
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
}

function displayTranscription(sttNumber, text) {
    const transcriptionElement = document.getElementById(`transcription${sttNumber}`);
    transcriptionElement.innerHTML = `<p class="transcription-text">${text}</p>`;
}

function updateMetrics(sttNumber, status, time, accuracy) {
    document.getElementById(`stt${sttNumber}-status`).textContent = status;
    document.getElementById(`stt${sttNumber}-time`).textContent = time;
    document.getElementById(`stt${sttNumber}-accuracy`).textContent = accuracy;
}

// Mock data generators (replace with actual STT integration)
function generateMockTranscription(sttNumber) {
    const mockTexts = [
        "This is a sample transcription from STT Technology 1. The quick brown fox jumps over the lazy dog. Speech recognition technology has advanced significantly in recent years, enabling more accurate and efficient transcription of audio content.",
        "This is a sample transcription from STT Technology 2. The quick brown fox jumps over the lazy dog. Modern speech-to-text systems utilize deep learning and neural networks to achieve impressive accuracy rates in various languages and accents."
    ];

    return mockTexts[sttNumber - 1];
}

function calculateMockAccuracy(sttNumber) {
    // Generate random accuracy between 85-98%
    const accuracy = (Math.random() * 13 + 85).toFixed(2);
    return `${accuracy}%`;
}

// Audio player event listeners
const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener('play', () => {
    // Audio playback started
});

audioPlayer.addEventListener('pause', () => {
    // Audio playback paused
});

audioPlayer.addEventListener('ended', () => {
    // Audio playback ended
});
