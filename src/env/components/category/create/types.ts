export interface ICategoryCreate{
    name:string,
    priority: number,
    image:File|null,
    description:string
    parentid: number
}