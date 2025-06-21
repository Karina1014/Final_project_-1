import { BookModel } from '../models/bookModel.js';

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación: que exista y sea numérico
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'A valid numeric ID is required in the URL.'
      });
    }

    // Eliminar el libro por su ID
    const result = await BookModel.destroy({
      where: { id }
    });

    if (result === 0) {
      return res.status(404).json({
        message: `No book found with ID ${id}`
      });
    }

    res.status(200).json({
      message: `Book with ID ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      message: 'Internal server error while deleting book'
    });
  }
};

export { deleteBook };

