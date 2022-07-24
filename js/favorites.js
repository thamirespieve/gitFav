export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entires = [
      {
        login: 'maykbrito',
        name: 'Mayk Brito',
        public_repos: '12',
        followers: '123'
      },
      {
        login: 'diego3g',
        name: 'Diego Fernandes',
        public_repos: '12',
        followers: '123'
      }
    ]
  }

  delete(user) {
    this.entires = this.entires.filter(entry => entry.login !== user.login)
    this.update()
  }
}

export class favoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = document.querySelector('table tbody')

    this.update()
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
    }
  }

  removeAllTr() {
    document.querySelectorAll('tbody tr').forEach(tr => tr.remove())
  }
}
