import { SyntheticEvent } from "react";

export interface IAvatar {
    wilderId: number,
    onChange: Function,
    onSubmit: Function
}

const AvatarForm = (props: IAvatar) => {

    return (
        <form>
            <div className="flex">
                <label htmlFor="Choisissez un avatar"></label>
                <input type="file" name="file" accept=".jpg, .png"
                onChange={(event: SyntheticEvent) => props.onChange(event)}/>
                <button type="submit" onSubmit={() => props.onSubmit()}>ok</button>
            </div>
        </form>
    )
}

export default AvatarForm;