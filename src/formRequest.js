import React, {useState} from 'react';; 

function Form(){
    const[prefrences, setPrefrences] = useState({
        ambiance: "",
        reviews: null,
        dishes: null,
    })    
    
    const handleChange = (event) => {
        setPrefrences({ ...prefrences, [event.target.name]: event.target.value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
        console.log(prefrences)
        console.log(typeof(parseInt(prefrences.reviews)))
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "api_key": "VRNbSIiLHwyF5N6UH2jmjPoU7tJvazlSe2VCNISs", 
                "features": [{"ambiance": prefrences.ambiance, "number_of_reviews": parseInt(prefrences.reviews), "award_winning_dishes": parseInt(prefrences.dishes)}],
                "model": "recommendations_rank_1646966912090",
                "test": 1,
                "version": "1"
            })
        };
        console.log("this point", {"ambiance": prefrences.ambiance, "reviews": prefrences.reviews, "dishes": prefrences.dishes})
        const res = fetch('https://api.mage.ai/v1/predict', requestOptions)
            .then(res => res.text()).then(alert)
            .catch(error => console.warn(error))
    }   

    return(
        <div>

            <form onSubmit={handleSubmit} className = "form-container">
                <div className='inner'>

                    <div className='input1'>
                        <h3>Ambiance</h3>
                        <select 
                        name="ambiance"
                        placeholder='ambiance'
                        value={prefrences.ambiance}
                        onChange={handleChange}
                        >
                            <option value="">Select...</option>
                            <option value="family friendly">Family Friendly</option>
                            <option value="romantic">Romantic</option>
                            <option value="casual">Casual</option>
                            <option value="fancy">Fancy</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                   
                    <div className='input2'>
                        <h3>Number of Reviews?</h3>
                        <input
                            type="text" pattern="[0-9]*"
                            name='reviews'
                            placeholder='reviews'
                            value={prefrences.reviews}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='input3'>
                        <h3>How many award winning dishes?</h3>
                        <input 
                            className='i3'
                            type="number"
                            name='dishes'
                            placeholder='dishes'
                            value={prefrences.dishes}
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>
                <button type="submit">Find Recs</button>
            </form>
            <div className='button'>
            </div>
        </div>

    );
}

export default Form
