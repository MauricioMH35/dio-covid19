import React, { memo } from 'react';
import RefreshIcon from '../../../assets/images/refresh.svg';
import { Card, Typography, Button, Select, MenuItem } from '../../../componets';
import COUNTRIES from 'commons/constants/Countries';
import { CardPanelContentStyled, ItemStyled } from './style';

const navigatorHasShare = navigator.share;

function Panel({ updateAt, onChange, data, country, getCovidData }) {
    const { cases, recovered, deaths, todayCases, todayDeaths } = data;
    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <img src={country.flag} alt={`Pais-${country.label}`} />
                &nbsp;
                <div>{country.label}</div>
            </ItemStyled>
        </MenuItem>
    );

    
    const textCovid19 = `Pais: ${country} - Recuperados: ${recovered}`;

    const shareInfo = () => {
        navigator.share({
            title: `Dados do Covid19 - ${country}`,
            text: textCovid19, 
            url: 'https://dio-covid19.netlify.app/' 
        });
    };

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19);
    };

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    );

    const renderCopyButton = (
        <div>
            <Button variant="contained" color="primary" onclick={copyInfo}>
                Copiar
            </Button>
        </div>
    );

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" component="span" color="primary">
                        COVID19
                    </Typography>
                    &nbsp; - &nbsp;
                    <Typography variant="h6" component="span" color="primary">
                        Painel Coronavírus
                    </Typography>
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                    <br />
                    <Typography variant="body2" component="span" color="primary">
                        Atualizado em: {updateAt}
                    </Typography>
                </div>
                { navigatorHasShare ? renderShareButton : renderCopyButton }
            </CardPanelContentStyled>
        </Card>
    );
}

export default memo(Panel);