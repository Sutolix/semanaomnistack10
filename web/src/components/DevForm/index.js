import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    //Pega a localização (lat/log)
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        )
    }, []); //toda vez que a variavel dentro desse array for mudada, ele roda o conteúdo de novo
    //estando vazio ( [] ), roda só uma vez

    async function handleSubmit(e) {
        e.preventDefault();


        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}

                />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        /*Pra settar o valor no estado*/
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        /*Pra settar o valor no estado*/
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>

            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;