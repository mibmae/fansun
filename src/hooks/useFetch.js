/**
 * 
 * @param {string} url 
 * @param {fetchEventInit} options 
 */
import { useEffect } from 'react';
import { useState } from 'react';
export function useFetch(url, options) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...options.headers
            }
        }).then((r => r.json())).then((data) => {
            // console.log(data.data)
            setData(data.data)
        })
    }, [])

    return {
        data, errors,
    }

}

// fetch(`https://serveur.fansun.webmg.eu/formations/all`, {
//         // fetch(`https://serveur.fansun.webmg.eu/formations/all`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'x-api-key': 'couscousgarbit',
//         },
//       }).then((response) => {
//         response.json().then((formations) => {
//           setFormationsAll(formations.data)
//         });
//       });
//       setTimeout(() => {
//         const userId = store.getState().User.user.id;
//         if (userId !== null || userId !== undefined) {
//           getOrders(userId)
//         }
//       }, 400);
//     }