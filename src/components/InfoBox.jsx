function InfoBox({ titulo, descricao }) {
  return (
    <article className="info-box">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </article>
  )
}

export default InfoBox
