import api from './api'

class App {
    constructor (){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form')
        this.listEl = document.getElementById('repo-list')
        //this.inputEl = document.querySelector('input[name=repository]')
        this.inputElUser = document.querySelector('input[name=usuario]')
        this.registerHandlers();
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if (loading == true){
            let loadingEl = document.createElement('span')
            loadingEl.appendChild(document.createTextNode('Carregando'))
            loadingEl.setAttribute('id', 'loading')

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove()
        }
    }

    async addRepository(event){
        event.preventDefault();
        const usuarioInput = this.inputElUser.value;
       //const repoInput = this.inputEl.value;
        //  if (usuarioInput.lenght === 0)
        //      return;

            this.setLoading();
    try{
        const response = await api.get(`/users/${usuarioInput}/repos`)
        const itens = await response.data
        var repoArray = itens
        
        repoArray.forEach((value) => {
           var nome = value.name,
           description = value.description,
           html_url = value.html_url,
           avatar_url = value.owner.avatar_url
           
            this.repositories.push({
                nome,
                description,
                html_url,
                avatar_url
            });   
        }); 
        
        
        this.render();

        } catch (err){
            alert('O usuário não existe')
 
        };

        this.setLoading(false)
    }
    
    render (){
        console.log(this.repositories)
        this.listEl.innerHTML = '';
        this.repositories.forEach ((repo) => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.nome));
            
            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_black');
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl)

        })
    };
};

new App()