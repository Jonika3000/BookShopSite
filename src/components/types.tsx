export interface IAuthor{
    Id:number,
    FirstName:string,
    Surname:string,
    Description:string,
    Year:string,
    Image:File|null
}
export interface IPublishingHouse{
    Id:number,
    Name:string,
    Description:string,
    Image: File|null
}
export interface IBook {
    id: number,
    Name: string,
    Description: string,
    Image: File | null,
    PageCount: string,
    Price: string,
    CategoryId:string,
    PublishingHouseId:string,
    AuthorId:string
}
export interface IAuthorGet {
    id: number,
    firstName: string,
    surname: string,
    description: string,
    year: string,
    image: string
}
export interface IPublishingHouseGet {
    id: number,
    name: string,
    description: string,
    image: string
}
export interface IBlog{
    Id:number,
    Title:string,
    Content:string
}
export interface IBlogGet {
    id: number,
    title: string,
    content: string
}
export interface ICategory {
    id: number,
    name: string,
    description: string, 
    slug: string
}
export interface IBookGet {
    id: number,
    name: string,
    description: string,
    image: string,
    pageCount: string,
    price: string,
    categoryId: string,
    publishingHouseId: string,
    authorId: string
}