new Vue({
    el: '#todo',
    data: {
        column1Cards: [],
        column2Cards: [],
        column3Cards: [],
        cardName: '',
        taskName: '',
        countCards: 0,
        countTasks: 0,
        completeTaskPercent: 0
    },
    methods: {
        addCard() {
            if (this.countCards < 3 && this.cardName !== '') {
                let newCard = {cardName: this.cardName, tasks: [], taskName: ''}
                this.column1Cards.push(newCard)
                this.countCards += 1
            }
            else if (this.cardName === '') {
                alert('Нельзя создавать пустую карточку!')
            }
            else {
                alert('Максимум можно добавить только 3 карточки!')
            }
        },
        addTask(cardIndex) {
            if (this.column1Cards[cardIndex].taskName !== '' && (this.countTasks < 3 || this.countTasks < 5)) {
                let newTask = {taskName: this.column1Cards[cardIndex].taskName, completeStyle: false}
                this.column1Cards[cardIndex].tasks.push(newTask)
                this.column1Cards[cardIndex].taskName = ''
                this.countTasks += 1
            }
            else if (this.column1Cards[cardIndex].taskName === '') {
                alert('Нельзя создавать пустую задачу!')
            }
            else {
                alert('Максимум можно добавить только 5 задач!')
            }
        },
        completeTask(newCard, cardIndex, taskIndex) {
            newCard.tasks[taskIndex].completeStyle =  !newCard.tasks[taskIndex].completeStyle
            const completedTasks = newCard.tasks.filter(task => task.completeStyle)
            this.completeTaskPercent = 100 / newCard.tasks.length * completedTasks.length
            console.log(this.completeTaskPercent)
        },
    }
})