// classe que vai conter lógica dos dados
// como os dados serão estruturados
export class Favorites {
    //a root é o #app
    constructor (root) {
        this.root = document.querySelector(root)
    }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
    constructor(root) {
        //o super chama o constructor da linha 5
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()
    }

    removeAllTr(){
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr').forEach((tr) => {
         tr.remove()
        })
    }
}