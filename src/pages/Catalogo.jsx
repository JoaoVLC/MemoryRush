import CardHQ from '../components/CardHQ.jsx'
import hqs from '../data/hqs.js'

function Catalogo() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Catalogo</p>
        <h1>Acervo de HQs</h1>
        <p>Confira os titulos ficticios cadastrados para a primeira versao do HQMania.</p>
      </div>

      <div className="cards-grid">
        {hqs.map((hq) => (
          <CardHQ
            key={hq.id}
            titulo={hq.titulo}
            descricao={hq.descricao}
            genero={hq.genero}
            imagem={hq.imagem}
          />
        ))}
      </div>
    </section>
  )
}

export default Catalogo
