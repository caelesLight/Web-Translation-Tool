Web Translation Tool - README
Getting Started

To start the website, use the following command:

npx serve


This will launch a local server where you can access the site.

Creating New Texts
Prepare your text:

Write the text that you want to translate.

Generate a JSON File:

Use the prompt in prompt.txt to generate a JSON file. The file should include your text and the translation instructions.

Important: In prompt.txt, make sure to replace this placeholder sentence:

"Specify the target language for the translation (e.g., English, Spanish, French, etc.)."

With something like:

"The target language for the translation is German."

This ensures that the translation is generated for the desired language.

Place the JSON File:

After generating the translation JSON, save it in the texte/ folder of your project.

Update the catalog.json:

The catalog.json file is used to link your newly created text to the website. Add an entry in the catalog.json that includes:

The id (a unique identifier for your text)

The title (a title for the text)

The file (the path to the generated JSON file, relative to the texte/ folder)

The language (the language code, e.g., "de" for German, "es" for Spanish)

Example:

[
  {
    "id": "example1",
    "title": "Example Title",
    "file": "texte/example1.json",
    "language": "de"
  },
  {
    "id": "example2",
    "title": "Another Example",
    "file": "texte/example2.json",
    "language": "es"
  }
]


There are already two example entries in the catalog.json for reference.

Folder Structure

Here's how the folder structure should look:

/project-root
  ├── texte/
  │   ├── example1.json
  │   ├── example2.json
  │   └── catalog.json
  ├── index.html
  ├── prompt.txt
  ├── README.md
  └── other files...


texte/: Contains the JSON files for each translated text.

catalog.json: The catalog linking each text to the website.

prompt.txt: Template for generating a new JSON file.

Notes

Language Codes: Make sure to use the correct language code for the translations, e.g., "de" for German, "es" for Spanish, etc.

Valid JSON: Ensure that all JSON files are properly formatted. Use a JSON validator
 to check.

No Trailing Commas: JSON files do not allow trailing commas (e.g., after the last entry in an array).

Example Workflow

Write your original text (e.g., in example3.txt).

Generate the JSON file using the prompt.txt template.

Save the new JSON file in the texte/ folder (e.g., texte/example3.json).

Add an entry in catalog.json for the new file, specifying the correct path and language.

Refresh the website to see the new text and translation options!
