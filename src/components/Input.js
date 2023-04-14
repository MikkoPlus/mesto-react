function Input(props) {
    return (
        <>
            <input required
               id={`input-${props.id}`}
               name={props.name}
               type={props.type}
               className={`form__input form__input_type_${props.type}`}
               placeholder={props.placeholder}
               {...props}/>
            <span id={`input-${props.id}-error`} className="form__input-text-error" />
        </>
    )
}

export default Input;