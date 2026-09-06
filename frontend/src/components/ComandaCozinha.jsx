import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../style.module.css'

const CHEFS_POR_PROTEINA = {
    "Frango grelhado": "Chef Reginald",
    "Tofu": "Chef Règis",
    "Carne magra": "Chef Reginaldo",
    "Ovo": "Chef Rejinarudo"
};

export function ComandaCozinha({ atualizar, ingredientes }) {

    const [comanda, setComanda] = useState([]);

    function buscarComanda() {
        axios.get("http://localhost:8080/restaurante/comanda")
            .then(resposta => setComanda(resposta.data));
    }

    useEffect(() => {
        buscarComanda();
    }, [atualizar]);

    function nomeDoIngrediente(id) {
        for (let i = 0; i < ingredientes.length; i++) {
            if (ingredientes[i].id === id) {
                return ingredientes[i].nome;
            }
        }
        return "";
    }

    function listaDeIngredientes(pedido) {
        const nomes = [
            nomeDoIngrediente(pedido.carboidratoId),
            nomeDoIngrediente(pedido.proteinaId),
            nomeDoIngrediente(pedido.vegetalId),
            nomeDoIngrediente(pedido.gorduraId),
            nomeDoIngrediente(pedido.temperoId)
        ];

        return nomes.join(" · ");
    }

    function chefResponsavel(pedido) {
        const proteina = nomeDoIngrediente(pedido.proteinaId);
        return CHEFS_POR_PROTEINA[proteina] || "Chef da Casa";
    }

    return (
        <section className={styles.comandaSecao}>
            <h2>Comanda da cozinha</h2>
            <div className={styles.comandaLista}>
                {comanda.map(pedido =>
                    <div key={pedido.id} className={styles.comandaFicha}>
                        <p className={styles.comandaNome}>{pedido.nomePrato}</p>
                        <p className={styles.comandaChef}> {chefResponsavel(pedido)}</p>
                        <p className={styles.comandaIngredientes}>{listaDeIngredientes(pedido)}</p>
                        <p className={styles.comandaPreco}>R$ {pedido.total}</p>
                        <span className={`${styles.comandaStatus} ${styles.statusEntregue}`}>
                            FINALIZADO
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}