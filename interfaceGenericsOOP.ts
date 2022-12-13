interface Observer<T> {
    next : (value : T) => void, 
    complete : () => void,
    error : (err : Error) => void,
    completed? : boolean,
    subscribe : (sub : Subscriber<T>) => void 
}

interface Subscriber<T> {
    onNext : (value : T) => void,
    onError : (err : Error) => void,
    onComplete : () => void 
}

class NumberSubscriber implements Subscriber<number> {

    constructor(private index : number) {

    }
    onNext(i : number) {
        console.log(`Number ${i} ${this.index}`)
    } 

    onComplete() {
        console.log("Done")
    }

    onError(err : Error) {
        console.error(err)
    }

}

class NumberObserver implements Observer<number> {
    subscribers : Array<Subscriber<number>> = []
    completed : boolean = false 

    // constructor() {
    //     this.initCounter()
    // }

    startCounter() {
        let count : number = 0
        const interval = setInterval(() => {
            if (count % 5 == 4) {
                this.next(count)
            }
            if (count === 100) {
                this.complete()
                clearInterval(interval)
            }
            count++

        }, 100)
    }

    next(value : number) {
        if (!this.completed) {
            this.subscribers.forEach((sub : Subscriber<number>) => sub.onNext(value))
        }
    }

    complete() {
        this.completed = true 
        this.subscribers.forEach((sub : Subscriber<number>) => sub.onComplete())
    }

    error(err : Error) {
        this.subscribers.forEach((sub : Subscriber<number>) => {
            sub.onError(err)
        } )
    }

    subscribe(sub: Subscriber<number>) {
        this.subscribers.push(sub)
    }
} 



const sub1 : NumberSubscriber = new NumberSubscriber(0)
const sub2 : NumberSubscriber = new NumberSubscriber(1)
const sub3 : NumberSubscriber = new NumberSubscriber(2)
const sub4 : NumberSubscriber = new NumberSubscriber(3)

const observer : NumberObserver = new NumberObserver()

observer.subscribe(sub1)
observer.subscribe(sub2)
observer.subscribe(sub3)
observer.subscribe(sub4)

observer.startCounter()