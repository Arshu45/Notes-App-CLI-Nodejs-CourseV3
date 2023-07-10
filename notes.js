const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen.bold(`New note added!`));
  } else {
    console.log(chalk.bgRed.bold(`Note title already taken`));
  }
};

const removeNote = (title) => {
  let notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen.bold(`Note Removed Succesfully!`));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed.bold(`No Note found!`));
  }
};

const listNotes = () => {
  let notes = loadNotes();
  console.log(chalk.bgCyan.bold(`Your Notes`));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  let notes = loadNotes();
  const foundNote = notes.find((note) => note.title === title);

  if (foundNote) {
    console.log(chalk.bgMagenta.bold(`" ${foundNote.title} "`));
    console.log(`" ${foundNote.body} "`);
  } else {
    console.log(chalk.bold.red(`Note not found`));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
