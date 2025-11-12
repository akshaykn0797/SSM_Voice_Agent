const fs = require('fs');
const path = require('path');

function parseXmlTranscript(xmlContent, speaker) {
  const words = [];
  // Simple regex to extract word elements with attributes
  const wordRegex = /<w[^>]*starttime="([^"]*)"[^>]*endtime="([^"]*)"[^>]*(?:punc="true")?[^>]*>([^<]*)<\/w>/g;

  let match;
  while ((match = wordRegex.exec(xmlContent)) !== null) {
    const [, startTime, endTime, wordText] = match;

    // Skip if it's punctuation or empty
    if (wordText && wordText.trim() && !match[0].includes('punc="true"')) {
      words.push({
        word: wordText.trim(),
        start: parseFloat(startTime) || 0,
        end: parseFloat(endTime) || 0,
        speaker: speaker
      });
    }
  }

  return words;
}

function combineTranscripts() {
  const basePath = '/Users/akshaykn/Documents/Official/Random/MAP - STT test/assets/audio';
  const outputPath = '/Users/akshaykn/Documents/Official/Random/MAP - STT test/maptest/public/ground_truth.json';

  const speakers = ['A', 'B', 'C', 'D'];
  let allWords = [];

  // Read and parse each speaker's file
  for (const speaker of speakers) {
    const filePath = path.join(basePath, `ES2007a.${speaker}.words.xml`);

    try {
      const xmlContent = fs.readFileSync(filePath, 'utf-8');
      const words = parseXmlTranscript(xmlContent, speaker);
      allWords = allWords.concat(words);
    } catch (error) {
      // Error reading file
    }
  }

  // Sort by start time
  allWords.sort((a, b) => a.start - b.start);

  // Create full transcript text
  const transcriptText = allWords.map(w => w.word).join(' ');

  // Create output data
  const outputData = {
    full_text: transcriptText,
    words: allWords,
    total_words: allWords.length,
    duration: allWords.length > 0 ? allWords[allWords.length - 1].end : 0
  };

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
}

combineTranscripts();
