Vue.component('registration',{
    data() {
        return{
            RepeatPassword:'',
            user: [
                {FirstName:'', 
                LastName:'', 
                Gender:'', 
                Password:'',
                mail: '', 
                Status:''}
            ],

            users:[
                {FirstName:'Admin', 
                LastName:'Admin', 
                Gender:'Male', 
                Password:'Admin',
                mail: 'admin@mail.ru', 
                Status:'Administrator'},
          ],
        }
    },
    methods: {
        f_FirstName (event) {
            console.log('f_FirstName');
            const InputValueUserName = document.querySelector('.FirstName');
       
            const lengthMore = this.user.FirstName === '';
            const digitsPresented = /[0-9]+/gm.test(this.user.FirstName);
            const lettersPresented = /[a-zA-Z]+/gm.test(this.user.FirstName);
      
              if (digitsPresented) {
                console.log('digitsPresented');
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "В имени не должно быть цифр";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            } else if (lengthMore) {
              console.log('lengthMore');
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "Введите имя";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            }else if (lettersPresented) {
              console.log('lettersPresented');
                InputValueUserName.style.borderColor = 'green';
            } else {
              console.log('else');
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "ошибка имени: поле ввода имени должно содержать только буквы кириллицы.";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            };
        },
        f_LastName (event) {
          const InputValueUserName= document.querySelector('.LastName')
            const lengthMore = this.user.LastName === '';
            const digitsPresented = /[0-9]+/gm.test(this.user.LastName);
            const lettersPresented = /[a-zA-Z]+/gm.test(this.user.LastName);
      
              if (digitsPresented) {
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "В именги не должно быть цифр";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            } else if (lengthMore) {
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "Введите имя";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            }else if (lettersPresented) {
                InputValueUserName.style.borderColor = 'green';
            } else {
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "ошибка имени: поле ввода имени должно содержать только буквы кириллицы.";
                InputValueUserName.style.borderColor = 'red';
                event.preventDefault();
            };
        },
        f_gender(event){
          const lengthMore = this.user.Gender === '';
          if(lengthMore){
            console.log('gender');
          }else{
            event.preventDefault();
          }
        },
        f_emailFilter (event) {
            const InputValueUserEmail = document.querySelector('.email');
      
            const emailFilter = /[a-zA-Z0-9]/gm.test(this.user.Email);
            const emailFilter_2 = /\@/g.test(this.user.Email);
            const emailFilter_3 = /\./g.test(this.user.Email);
            if (emailFilter && emailFilter_2 && emailFilter_3) {
                InputValueUserEmail.style.borderColor = 'green';
            } else {
                // class_nameUser.style.display = "block";
                // text_nameUser.innerText = "проверьте почту";
                InputValueUserEmail.style.borderColor = 'red';
                event.preventDefault();
            }
        },
        f_PasswordFilter (event){
          const regist_text = document.querySelector('.regist-p')
      
          const lengthMore_Password = this.user.Password.length<8;
      
          const digitsPassword = /[0-9]+/gm.test(this.user.Password);
          const lettersPassword = /[a-zA-Z]+/gm.test(this.user.Password);
      
          const Matching_Password = this.RepeatPassword === this.user.Password;
          const notMatch_Password = this.RepeatPassword !== this.user.Password;
      
          if(lengthMore_Password){
            console.log('меньше 8 знаков');
            event.preventDefault();
          } else if(notMatch_Password){
            console.log('не совпадают');
            event.preventDefault();
          }
          else if(digitsPassword && lettersPassword && Matching_Password){
            regist_text.style.color='green';
            
          }else{
            regist_text.style.color='red';
            regist_text.style.fontSize='15px';
          }
        },
        JOIN_NOW(event){ 
            this.f_FirstName(event);
            this.f_LastName(event);
            this.f_emailFilter(event);
            this.f_PasswordFilter(event);
            
            this.$parent.add_newUser();
            
        },

    },
    computed:{
       
      },

    mounted(){

    },
     template: 
`<div class="registration">
        <form action="#">
        <p class="p-SUM"> Full Name </p> <br>
    <input class="input FirstName" type="text" placeholder="First Name" v-model = "user.FirstName"><br>
    <input class="input LastName" type="text" placeholder="Last Name" v-model = "user.LastName"><br>

    <div class="registration-checkbox">
        <div>
            <input type="radio" id="Male" value="Male" v-model="user.Gender">
            <label for="Male">Male</label>
        </div>

        <div>
            <input type="radio" id="Female" value="Female" v-model="user.Gender">
            <label for="Female">Female</label>
        </div>
    </div>
    
    

    <p class="p-SUM">Login details</p> <br>
    <input class="input email" type="email" placeholder="Email" v-model="user.Email"><br>
    <input class="input" type="text" placeholder="Password" v-model="user.Password"><br>
    <input class="input" type="text" placeholder="Repeat password" v-model="RepeatPassword"><br>
    </form>

    <p class="regist-p">Please use 8 or more characters, with at least 1 number and a mixtureof uppercase and lowercase letters</p>
    <button @click="JOIN_NOW($event)" class="registration-but" type="#">JOIN NOW <img src="img/href/but.png" alt=""></button>
</div>`
});

