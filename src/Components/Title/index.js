import '../Title/style.css'


export default function Title({ children, name}) {

    return (
        <div className='title'>
            {children[0]}
            <span>{name}</span>
            <div>
              <span> {children[1]}</span>
            </div>
            
        </div>
    )
}