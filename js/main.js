new Vue({
    el: '#todo',
    data: {
        column1Cards: [],
        column2Cards: [],
        column3Cards: [],
        cardName: '',
        taskName: '',
        countColumnCard1: 0,
        countColumnCard2: 0,
        countTasks: 0,
        completeTaskPercent: 0,
        isFirstColumnBlocked: false
    },
    methods: {
        addCard() {
            if (this.countColumnCard1 < 3 && this.cardName !== '') {
                let newCard = {cardName: this.cardName, tasks: [], taskName: ''}
                this.cardName = ''
                this.column1Cards.push(newCard)
                this.countColumnCard1 += 1
                this.saveDataToLocalStorage()
            }
            else if (this.cardName === '') {
                alert('Нельзя создавать пустую карточку!')
            }
            else {
                alert('Максимум можно добавить только 3 карточки!')
            }
        },
        addTask(cardIndex) {
            if (this.column1Cards[cardIndex].taskName !== '' && (this.countTasks < 3 || this.countTasks < 5) && !this.isFirstColumnBlocked) {
                let newTask = {taskName: this.column1Cards[cardIndex].taskName, completeStyle: false}
                this.column1Cards[cardIndex].tasks.push(newTask)
                this.column1Cards[cardIndex].taskName = ''
                this.countTasks += 1
                this.saveDataToLocalStorage()
            }
            else if (this.column1Cards[cardIndex].taskName === '') {
                alert('Нельзя создавать пустую задачу!')
            }
            else {
                alert('Максимум можно добавить только 5 задач!')
            }
        },
        completeTask(newCard, taskIndex, cardIndex) {
            newCard.tasks[taskIndex].completeStyle =  !newCard.tasks[taskIndex].completeStyle
            const completedTasks = newCard.tasks.filter(task => task.completeStyle)
            this.completeTaskPercent = 100 / newCard.tasks.length * completedTasks.length
            if (this.completeTaskPercent === 100) {
                this.countColumnCard2 -= 1
                this.column3Cards.push(this.column2Cards[cardIndex])
                this.column2Cards.splice(cardIndex, 1)
                newCard.timeEnd = new Date().toLocaleString()
            }
            else if (this.completeTaskPercent >= 50 && this.countColumnCard2 < 5 && !this.isFirstColumnBlocked) {
                this.countColumnCard1 -= 1
                this.countColumnCard2 += 1
                this.column2Cards.push(this.column1Cards[cardIndex])
                this.column1Cards.splice(cardIndex, 1)
            }
            if (this.countColumnCard2 > 0) {
                this.isFirstColumnBlocked = true
            }
            else if (this.countColumnCard2 === 5 && this.completeTaskPercent >= 50) {
                this.isFirstColumnBlocked = true
            }
            this.saveDataToLocalStorage()
        },

        saveDataToLocalStorage() {
            const dataToStore = {
                column1Cards: this.column1Cards,
                column2Cards: this.column2Cards,
                column3Cards: this.column3Cards,
                countColumnCard1: this.countColumnCard1,
                countColumnCard2: this.countColumnCard2,
                isFirstColumnBlocked: this.isFirstColumnBlocked
            }
            localStorage.setItem('appData', JSON.stringify(dataToStore))
        },
    },
    mounted() {
        const storedData = JSON.parse(localStorage.getItem('appData'))
        this.column1Cards = storedData.column1Cards
        this.column2Cards = storedData.column2Cards
        this.column3Cards = storedData.column3Cards
        this.countColumnCard1 = storedData.countColumnCard1
        this.countColumnCard2 = storedData.countColumnCard2
        this.isFirstColumnBlocked = storedData.isFirstColumnBlocked
    }
})