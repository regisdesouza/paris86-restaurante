import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../style.module.css'

export function Cardapio({
    setNome,
    setCarboidratoId,
    setProteinaId,
    setVegetalId,
    setGorduraId,
    setTemperoId
}) {

    const [cardapio, setCardapio] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/restaurante/cardapio")
            .then(resposta => {
                setCardapio(resposta.data);
                setCarregando(false);
            })
            .catch(() => {
                setErro(true);
                setCarregando(false);
            });
    }, []);

    function usarPratoDoCardapio(prato) {
        setNome(prato.prato);
        setCarboidratoId(String(prato.carboidratoId));
        setProteinaId(String(prato.proteinaId));
        setVegetalId(String(prato.vegetalId));
        setGorduraId(String(prato.gorduraId));
        setTemperoId(String(prato.temperoId));
    }

    return (
        <section className={styles.cardapioSecao}>
            <h2>Cardápio da casa</h2>

            {carregando && <p className={styles.mensagemStatus}>Carregando cardápio...</p>}
            {erro && <p className={styles.mensagemErro}>Não foi possível carregar o cardápio. Tente novamente mais tarde.</p>}

            {!carregando && !erro &&
                <div className={styles.cardapioLista}>
                    {cardapio.map(card =>
                        <div key={card.id} className={styles.cardapioCard}>
                            <div className={styles.cardapioNome}>{card.prato}</div>
                            <div className={styles.cardapioDescricao}>{card.descricao}</div>
                            <div className={styles.cardapioPreco}>R$ {card.preco.toFixed(2)}</div>
                            <button
                                className={styles.cardapioBotao}
                                onClick={() => usarPratoDoCardapio(card)}
                            >
                                Selecionar
                            </button>
                        </div>
                    )}
                </div>
            }
        </section>
    );
}