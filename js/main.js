new Vue({
    el: '#todo',
    data: {
        cards: [],
        tasks: [],
        column1Cards: [],
        column2Cards: [],
        column3Cards: [],
        name: '',
        newTask: '',
        countCards: 0,
        completeTaskPercent: 0
    },
    methods: {
        addCard() {
            if (this.countCards < 3 && this.name !== '') {
                let newCard = {name: this.name, tasks: []}
                this.column1Cards.push(newCard)
                this.countCards += 1
            }
            else if (this.name === '') {
                alert('Нельзя создавать пустую карточку!')
            }
            else {
                alert('Максимум можно добавить только 3 карточки!')
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask);
            console.log(this.cards)
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completeStyle = !this.cards[cardIndex].tasks[taskIndex].completeStyle
            const completedTasks = this.cards[cardIndex].tasks.filter(task => task.completeStyle)
            this.completeTaskPercent = 100 / this.cards[cardIndex].tasks.length * completedTasks.length
        },
    }
})