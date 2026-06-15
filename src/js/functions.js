'use strict';

/**
 * Obtiene categorías en formato XML desde una URL y retorna un resultado estandarizado.
 *
 * @param {string} url URL del recurso XML de categorías.
 * @returns {Promise<{success: boolean, body: Document|string}>} Resultado de la operación.
 */
let fetchCategories = async (url) => {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        let text = await response.text()

        const parser = new DOMParser();
        const data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        };

    } catch (error) {

        return {
            success: false,
            body: error.message
        };

    }
}

/**
 * Obtiene productos en formato JSON desde una URL y retorna un resultado estandarizado.
 *
 * @param {string} url URL del recurso JSON de productos.
 * @returns {Promise<{success: boolean, body: any[]|string}>} Resultado de la operación.
 */
let fetchProducts =  (url) => {

    return fetch(url)
        .then(response => {

            // Verificar si la respuesta no es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.json();

        })
        .then(data => {

            // Respuesta exitosa
            return {
                success: true,
                body: data
            };

        })
        .catch(error => {

            // Error en la solicitud
            return {
                success: false,
                body: error.message
            };

        });
}

export { fetchProducts, fetchCategories }