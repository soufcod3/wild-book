const Avatar = (props: {src: string}) => {

    return (
        <div>
            <h1>Avatar</h1>
            <img src={props.src} alt="ts"/>
        </div>
        
    )

}

export default Avatar;