function csrfToken(document) {
    return document.querySelector('[name="csrf-token"]').content;
  }
  
  export function passCsrfToken(document, axios) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
  }