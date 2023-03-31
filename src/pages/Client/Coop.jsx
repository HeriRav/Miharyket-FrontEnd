import { useState } from "react";

function Coop () {
    const [inputValue, setInputValue] = useState('');

    function handleInput(event) {
        const input = event.target.value.replace(/\D/g, '').substring(0, 12);
        const formattedInput = input.replace(/(\d{3})(?=\d)/g, '$1 ');

        setInputValue(formattedInput);
    }
    return(
        <>
            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, qui.
            Quidem officia quo sit ipsum repellat labore nostrum eum et.
            Voluptate tempore soluta illum iure mollitia, corporis eum in provident!
            Quisquam repellat consequuntur deleniti accusantium magni unde, eum alias enim.
            Aliquid consequuntur, maiores adipisci dolorum dignissimos incidunt porro nostrum eum.
            Optio, quibusdam vel amet quia labore tempora sint quasi dolores.
            Voluptatibus quasi qui esse, ex accusantium magni explicabo beatae reprehenderit.
            Atque recusandae, quidem et odit iste voluptatibus amet temporibus impedit?
            Aspernatur id porro minima quo fuga deserunt, laudantium accusantium commodi!
            Aut molestiae vero qui perferendis illum nemo, ipsam adipisci. Repellendus.</h1>

            <input type="text" value={inputValue} onChange={handleInput} />
            
        </>
    )
}

export default Coop
