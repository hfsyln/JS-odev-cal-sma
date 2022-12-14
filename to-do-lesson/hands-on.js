//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");


//let todos = []; //boş arraye her elementi bas push ile
let todos = JSON.parse(localStorage.getItem("TODOS")) || []    //todos içinde bişey yoksa hiç bişey yapma//array haline getirerek aldık ama hala dom da değil çünkü çağırdık basmadık
//localStorage.getItem("TODOS"); sitring olarak getirir 

console.log(todos);



addBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") {
      alert("PLease enter new todo");
    } else { //olunca obje oluştur ve girileni obje yap (ne zaman yeni obje oluştu ona ıd ata textini texte ata diğerlerini yap)
      const newTodo = {
        id: new Date().getTime(),
        completed: false,
        text: todoInput.value,
      };

         createListElement(newTodo); //newtodo bilgisini fonksiyona göndermek için
        //diziye ıtem ekliyoruz push ile
        todos.push(newTodo); //boş dizide tutuyoruz henüz rem belleğe atmadık oluşan her  ul yi
        localStorage.setItem("TODOS", JSON.stringify(todos)); //TODOS adı ile locale rem belleğe gönder locale kaydettik ama sayfayı yeniliyince sayfada görünmüyor henüz
        console.log(todos);
        todoInput.value = ""; //sıfırlıyoruz bir ul eklenince ikinciye geçince input bölümü 0 la
        };
});


   const createListElement = (newTodo) => {
    //!elementleri oluştur ve bağla 
    
    const li = document.createElement("li");
    li.id = newTodo.id // li.setAttribute("id", newTodo.id) aynı sonuç oluşan ıd yi li ye aktardık(kullanıcaz silme vs için)
    console.log(li);


    const okIcon = document.createElement("i");
    okIcon.setAttribute("class", "fas fa-check" );
    li.appendChild(okIcon);
    console.log(li);

    const p = document.createElement("p");
    p.textContent = todoInput.value  //const pTextNode = document.createTextNode(newTodo.text);
    //p.appendChild(pTextNode); //object içindeki text ten alıyoruz
    li.appendChild(p);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fas fa-trash");
    li.appendChild(deleteIcon);

    todoUl.appendChild(li);

    //newTodo.completed ? li.classList.add("checked") : "" //tıklama durumu için ama zaten yukarıda tıklama tanımlı ve completed değişti
    newTodo.completed && li.classList.add("checked") //aynı işi yapar
};


//açılışta eskileri ekranda görmek için 26. satırda ki devam
const renderSavedTodos = () => {
  todos.forEach(todo => {
    createListElement(todo)// creatlistelementi çağır ve todo adını verdiğim her bir ul yi çağır bu fon kullanarak doma yazdır
    
  });
};
renderSavedTodos();


//parente verilen event childları yakalar target ile nerden geldiğini anlarız(hangi buton)
todoUl.addEventListener("click", (e) => {
  console.log(e.target);
  //e.target hangi buton olduğu verir
  //domdan sil ve checked et
  const id = e.target.parentElement.getAttribute("id");
  //! event, bir delete butonundan geldi ise
  if (e.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    e.target.parentElement.remove();

    //? Dizinin ilgili elementini sil "localden sil"
    todos = todos.filter((todo) => todo.id !== Number(id)); //id si buna eşit olmayanları yazdır diğerini sil yeni todos silinmiş haliyle olsun 


    //? todos dizisinin son halini localStorage'e sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));
    } else if (e.target.classList.contains("fa-check")) {
    //! event, bir okey butonundan geldi ise
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde ekle (DOM)
    e.target.parentElement.classList.toggle("checked");
      //localde değiştir
    todos.map((todo) => {
        if(todo.id == id){
            todo.completed = !todo.completed
        }
        localStorage.setItem("TODOS", JSON.stringify(todos));
      })
      console.log(todos)
    }
});
 
    
//? Enter tusu ile ekleme mumkun olsun
todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
window.onload = function () {
 todoInput.focus();
};