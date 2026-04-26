function CardHQ({ titulo, descricao, genero, imagem }) {
  return (
    <article className="card-hq">
      <img src={imagem} alt={`Capa da HQ ${titulo}`} className="card-hq__imagem" />
      <div className="card-hq__conteudo">
        <span className="card-hq__genero">{genero}</span>
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </article>
  )
}

export default CardHQ
