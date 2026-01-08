const githubService = {
  /**
   * Upload an image to GitHub repository
   * @param {File} file - The image file to upload
   * @param {string} token - GitHub Personal Access Token
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<string>} - The path to the uploaded image
   */
  async uploadImage(file, token, owner, repo) {
    try {
      // Convert file to base64
      const base64Content = await this.fileToBase64(file);
      
      // Generate filename with timestamp to avoid conflicts
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `image_${timestamp}.${extension}`;
      const path = `public/gallery/${filename}`;

      // GitHub API endpoint
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // Create the file on GitHub
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add gallery image: ${filename}`,
          content: base64Content,
          branch: 'main' // or 'master' depending on your default branch
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image to GitHub');
      }

      // Return the path that will be used in the gallery
      return `/gallery/${filename}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  /**
   * Update gallery data JSON file on GitHub
   * @param {Array} galleryData - The updated gallery data array
   * @param {string} token - GitHub Personal Access Token
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   */
  async updateGalleryData(galleryData, token, owner, repo) {
    try {
      const path = 'src/data/galleryData.json';
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // First, get the current file to obtain its SHA (required for updates)
      const getResponse = await fetch(url, {
        headers: {
          'Authorization': `token ${token}`,
        }
      });

      if (!getResponse.ok) {
        throw new Error('Failed to fetch current galleryData.json');
      }

      const currentFile = await getResponse.json();
      const sha = currentFile.sha;

      // Convert gallery data to base64
      const content = JSON.stringify(galleryData, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(content)));

      // Update the file on GitHub
      const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update gallery data via admin panel',
          content: base64Content,
          sha: sha,
          branch: 'main' // or 'master'
        })
      });

      if (!updateResponse.ok) {
        const error = await updateResponse.json();
        throw new Error(error.message || 'Failed to update galleryData.json on GitHub');
      }

      return true;
    } catch (error) {
      console.error('Error updating gallery data:', error);
      throw error;
    }
  },

  /**
   * Convert file to base64 string
   * @param {File} file - The file to convert
   * @returns {Promise<string>} - Base64 encoded string
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data:image/...;base64, prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }
};

export default githubService;
