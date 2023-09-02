// classe que vai conter lógica dos dados
// como os dados serão estruturados
export class Favorites {
  //a root é o #app
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
        {
            login: 'maykbrito',
            name: 'Mayk Brito',
            public_repos: '76',
            followers: '9586'
        }, 
        {
            login: 'Diego3g',
            name: 'Diego Fernandes',
            public_repos: '76',
            followers: '9586'
        },
    ]
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    //o super chama o constructor da linha 5
    super(root)

     this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()


    this.entries.forEach( user => {
        const row = this.createRow()
        
        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Imagem do ${user.name}`
        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers
        
    this.tbody.append(row)
    })

  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/maykbrito.png" alt="Imagem do perfil">
            <a href="https://github.com/maykbrito.png" target="_blank">
                <p>Maik Brito</p>
                <span>maykbrito</span>
            </a>
        </td>
        <td class="repositories">76</td>
        <td class="followers">9586</td>
        <td class="action"><button>Remover</button></td>
        `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}
