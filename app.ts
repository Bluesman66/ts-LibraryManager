import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';
import { CalculateLateFee as CalcFee, MaxBooksAllowed, Purge } from './lib/utilityFunctions';
import RefBook from './encyclopedia';
import Shelf from './shelf';

let calc = CalcFee(5);
let max = MaxBooksAllowed(50);

let ref = new RefBook('Alex', 1966, 2);

function GetAllBooks(): Book[] {
	
	let books = [
		{ id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
		{ id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
		{ id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: Category.Poetry },
		{ id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
	];
	
	return books;
}

function LogFirstAvailable(books = GetAllBooks()): void {
	
	let numberOfBooks: number = books.length;
	let firstAvailable: string = '';
		
	for(let currentBook of books) {
		
		if(currentBook.available) {
			firstAvailable = currentBook.title;
			break;
		}
	}
	
	console.log('Total Books: ' + numberOfBooks);
	console.log('First Available: ' + firstAvailable);
}

function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): Array<string> {
	
	console.log('Getting books in category: ' + Category[categoryFilter]);
	
	const allBooks = GetAllBooks();
	const filteredTitles: string[] = [];
	
	for(let currentBook of allBooks) {
		if(currentBook.category === categoryFilter) {
			filteredTitles.push(currentBook.title);
		}
	}
	
	return filteredTitles;
}

function LogBookTitles(titles: string[]): void {	
	for(let title of titles) {
		console.log(title);
	}
}

function GetBookByID(id: number): Book {
	const allBooks = GetAllBooks();
	return allBooks.filter(book => book.id === id)[0];
}

function CreateCustomerID(name: string, id: number): string {
	return name + id;
}

function CreateCustomer(name: string, age?: number, city?: string): void {
	console.log('Creating customer ' + name);
	
	if(age) {
		console.log('Age: ' + age);
	}
	
	if(city) {
		console.log('City: ' + city);
	}
}

function CheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
	
	console.log('Checking out books for ' + customer);
	
	let booksCheckedOut: string[] = [];
	
	for(let id of bookIDs) {
		let book = GetBookByID(id);
		if (book.available) {
			booksCheckedOut.push(book.title);
		}
	}
	
	return booksCheckedOut;
}

function GetTitles(author: string): string[];
function GetTitles(available: boolean): string[];
function GetTitles(bookProperty: any): string[] {
	const allBooks = GetAllBooks();
	const foundTitles: string[] = [];
	
	if(typeof bookProperty == 'string') {
		// get all books by a particular author
		for(let book of allBooks) {
			if(book.author === bookProperty) {
				foundTitles.push(book.title);
			}
		}
	}
	
	else if(typeof bookProperty == 'boolean') {
		// get all books based on specified availability
		for(let book of allBooks) {
			if(book.available === bookProperty) {
				foundTitles.push(book.title);
			}
		}
	}
	return foundTitles;
}

function PrintBook(book: Book): void {
	console.log(book.title + ' by ' + book.author);
}

/***********************************************************/

let inventory: Array<Book> = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

let bookShelf: Shelf<Book> = new Shelf<Book>();

inventory.forEach(book => bookShelf.add(book));

let firstBook: Book = bookShelf.getFirst();

let magazines: Array<Magazine> = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();

magazines.forEach(mag => magazineShelf.add(mag));

let firstMagazine: Magazine = magazineShelf.getFirst();

// let numberShelf: Shelf<number> = new Shelf<number>();
// [5, 10, 15].forEach(num => numberShelf.add(num));

magazineShelf.printTitles();

let softwareBook: Book = bookShelf.find('Code Complete');
console.log(`${softwareBook.title} (${softwareBook.author})`);

// let purgeBooks: Array<Book> = Purge<Book>(inventory);
// purgeBooks.forEach(book => console.log(book.title));

// let purgeNums: Array<number> = Purge<number>([1 ,2 ,3 ,4, 5]);
// console.log(purgeNums); 

// let Newspaper = class extends ReferenceItem {
// 	printCitation(): void {
// 		console.log(`Newspaper: ${this.title}`);
// 	}
// }

// let myPaper = new Newspaper('The Gazette', 2016);
// myPaper.printCitation();

// class Novel extends class { title: string } {
// 	mainCharacter: string;
// }

// let favoriteNovel = new Novel();

// let ref: ReferenceItem = new Encyclopedia('Alex', 1966, 1);
// ref.printItem();
// ref.printCitation();

// let ref: ReferenceItem = new ReferenceItem('Alex', 1966);
// ref.printItem();

// let favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Sharon';
// favoriteLibrarian.assistCustomer('Lynda');

// let myBook: Book = {
//     id: 5,
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     available: true,
//     category: Category.Fiction,
// 	pages: 250,
// 	markDamaged: (reason: string) => console.log('Damaged: ' + reason) 
// }

// let logDamage: DammageLogger;
// logDamage = (damage: string) => console.log('Damage reported: ' + damage);
// logDamage('coffee stains');

// PrintBook(myBook);
// myBook.markDamaged('missing back cover');

//let books = GetTitles('Herman Melville');
// let books = GetTitles(false);
// books.forEach(title => console.log(title));

// let myBooks: string[] = CheckoutBooks('Alex', 1, 3, 4);
// myBooks.forEach(title => console.log(title));

//LogFirstAvailable();

// let poetryBooks = GetBookTitlesByCategory(Category.Poetry);
// poetryBooks.forEach(title => console.log(title));

//CreateCustomer('Alex');
//CreateCustomer('Alex', 51);
//CreateCustomer('Alex', 51, 'Chelyabinsk');

// let x: number;
// x = 5;

// let IdGenerator: (string, number) => string;
// //IdGenerator = CreateCustomerID;
// IdGenerator = (name: string, id: number) => { return name + id };

// let myID = IdGenerator('Alex', 20);
// console.log(myID);

// const fictionBooks = GetBookTitlesByCategory(Category.Fiction);
// fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val));