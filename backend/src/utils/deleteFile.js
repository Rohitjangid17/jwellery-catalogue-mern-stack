import fs from "fs";
import path from "path";

/**
 * Deletes a file from the filesystem if it exists.
 * @param {string} filePath - Relative or absolute path to the file.
 */
export const deleteUploadedFile = (filePath) => {
    try {
        const resolvedPath = path.resolve(filePath);
        if (fs.existsSync(resolvedPath)) {
            fs.unlinkSync(resolvedPath);
        }
    } catch (err) {
        console.error("Error deleting uploaded file:", err.message);
    }
}
