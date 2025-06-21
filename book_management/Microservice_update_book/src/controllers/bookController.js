import { BookModel } from '../models/bookModel.js';

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      category,
      lenguage,
      description,
      total_copies,
      available_copies,
      location
    } = req.body;

    // Basic validation
    if (
      !id || isNaN(id) ||
      !title || !author || !category || !lenguage || !description ||
      total_copies === undefined || available_copies === undefined || !location
    ) {
      return res.status(400).json({
        message: 'All fields are required: id (in URL), title, author, category, lenguage, description, total_copies, available_copies, location'
      });
    }

    const book = await BookModel.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the fields
    await book.update({
      title,
      author,
      category,
      lenguage,
      description,
      total_copies,
      available_copies,
      location
    });

    res.status(200).json({
      message: 'Book updated successfully',
      book
    });

  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error while updating book' });
  }
};

export { updateBook };

// This code defines a function to update a book's details in the database.
// It checks for the presence of required fields, validates the book ID, and updates the book

