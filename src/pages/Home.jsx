import CardHQ from '../components/CardHQ.jsx'
import hqs from '../data/hqs.js'

function Home() {
  const hqsEmDestaque = hqs.filter((hq) => hq.destaque)

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Biblioteca digital de HQs</p>
          <h1>HQMania</h1>
          <p>
            Explore historias, descubra novos generos e acompanhe uma primeira
            versao em React de um catalogo academico de historias em quadrinhos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Selecao inicial</p>
          <h2>HQs em destaque</h2>
        </div>

        <div className="cards-grid">
          {hqsEmDestaque.map((hq) => (
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
    </>
  )
}

export default Home
