/**
 * Inicializa un contador interactivo en un elemento del DOM.
 *
 * @param {HTMLElement} element Elemento botón donde se renderiza y actualiza el contador.
 * @returns {void}
 */
export function setupCounter(element) {
  let counter = 0
  /**
   * Actualiza el valor del contador y su representación visual.
   *
   * @param {number} count Nuevo valor del contador.
   * @returns {void}
   */
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
