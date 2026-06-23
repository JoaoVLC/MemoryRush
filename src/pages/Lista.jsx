import InfoBox from '../components/InfoBox.jsx'

const recursos = [
  {
    titulo: 'Jogo',
    descricao: 'Partida principal em canvas, com sequência de cores e escolha de dificuldade.',
  },
  {
    titulo: 'Ranking',
    descricao: 'Lista de pontuações salvas no navegador para comparar o desempenho dos jogadores.',
  },
  {
    titulo: 'Perfil',
    descricao: 'Área protegida com dados do jogador, estatísticas e imagem de perfil.',
  },
  {
    titulo: 'Central de Desafios',
    descricao: 'Página integrada com API REST para carregar dados dinâmicos da comunidade.',
  },
]

function Lista() {
  return (
    <section className="content-page">
      <p className="eyebrow">Lista</p>
      <h1>Recursos do Memory Rush</h1>
      <p>
        Esta página reúne as principais áreas da aplicação em uma lista de itens
        reutilizando o componente InfoBox.
      </p>

      <div className="info-grid">
        {recursos.map((recurso) => (
          <InfoBox key={recurso.titulo} titulo={recurso.titulo} descricao={recurso.descricao} />
        ))}
      </div>
    </section>
  )
}

export default Lista
