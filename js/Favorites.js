import { GithubUser } from './GithubUser.js'

// classe que vai conter lógica dos dados
// como os dados serão estruturados
export class Favorites {
  //a root é o #app
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username)

      if (userExists) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    // highed-order functions (map, filter,...)
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )

    this.entries = filteredEntries
    this.update()
    this.save()
    this.noFavorites()
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    //o super chama o constructor da linha 7
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach((user) => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem do ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')

        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
      this.noFavorites()
    })
  }

  noFavorites() {
    if (this.entries.length === 0) {
      this.root.querySelector('table tfoot').style.display = ''
    } else {
        this.root.querySelector('table tfoot').style.display = 'none'
    }
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
        <td class="action"><button class='remove'>Remover</button></td>
        `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}
