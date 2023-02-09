// jQuery must be within your project for this script to function.

// How to use at bottom

function f ( x, n ){

    let result = null;

    for (let y = 0; y < x.length; y++){
        if (typeof x[y] === 'number'){
            if (y >= 5)throw new Error('Too many inputs');
            result += '\n'+x[y] * n;
        }
        else throw new Error(`Inputs can only be a number! ${x} is invalid.`);
    }

    function debug( parent_element ){ 
        parent_element = parent_element || null;

        if (parent_element && typeof parent_element === 'string'){
            
            let el = $(`${parent_element}`);
                
            let splitResult = result.split('\n');
            
            for (let w = 0; w < splitResult.length; w++){
                if (!splitResult[w].includes('null')) el.append(`<br><code>${splitResult[w]}</code>`);
            }
            
            el.css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            });

            $(`${parent_element} code`).css({ fontSize: '5rem' });

        }
        else if (parent_element && typeof parent_element != 'string') 
            throw new Error(`${parent_element} is not a valid element.`);
        else
        {
            return console.log(result);
        }
    }

    return { debug };
    
}
export { f };

/* How to use:
    f(array, multiply);
    
    EXAMPLE: f([1,2,3], 2); = 2,4,6
    
    debug() will log the values in the console OR you can show them in an Element
    (like a div for example) by doing debug(class, id, or tagname) and this will
    create individual span elements for each value within the container.
*/
