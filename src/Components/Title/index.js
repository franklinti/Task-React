import '../Title/style.css'


export default function Title({ children, name }) {

    console.log(name)
    return (
        <div className='title'>
            {children}
            <span>{name}</span>
        </div>
    )
}