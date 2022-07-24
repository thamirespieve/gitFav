import { GithubUser } from './githubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entires = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entires))
  }

  async add(username) {
    try {
      const userExisted = this.entires.find(entry => {
        return entry.login === username
      })

      if (userExisted) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entires = [user, ...this.entires]

      this.update()
      this.save()
    } catch (error) {
      alert(error)
    }
  }

  delete(user) {
    const filteredEntries = this.entires.filter(
      entry => entry.login !== user.login
    )

    this.entires = filteredEntries
    this.update()
    this.save()
  }
}

export class favoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = document.querySelector('table tbody')

    this.update()
    this.onAdd()
  }

  update() {
    this.removeAllTr()
    this.entires.forEach(entry => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://github.com/${entry.login}.png`

      row.querySelector('.user img').alt = `Foto de usuário ${entry.name}`
      row.querySelector('.user a').href = `https://github.com/${entry.login}`
      row.querySelector('.user  p').textContent = entry.name
      row.querySelector('.user span').textContent = entry.login

      row.querySelector('.repositories').textContent = entry.public_repos
      row.querySelector('.followers').textContent = entry.followers

      const buttonRemove = row.querySelector(' button')

      buttonRemove.onclick = () => {
        const isOk = confirm('Você deseja realmente excluir este usuário?')
        if (isOk) this.delete(entry)
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img
        src="https://github.com/maykbrito.png"
        alt="Foto de usuário Mayk Brito"
      />
      <a href="https://github.com/maykbrito" target="_blank">
        <p>Mayk Brito</p>
        <span>maykbrito</span>
      </a>
    </td>
    <td class='repositories'>123</td>
    <td class='followers'>1234</td>
    <td><button class="remove">Remover</button></td>
  `

    return tr
  }

  onAdd() {
    const buttonSearch = document.querySelector('header button')

    buttonSearch.onclick = () => {
      const { value } = document.querySelector('#input-search')

      this.add(value)
    }
  }

  removeAllTr() {
    document.querySelectorAll('tbody tr').forEach(tr => tr.remove())
  }
}
