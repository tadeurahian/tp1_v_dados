(function () {
    'use strict';

    var DataSetPrincipal = [];
    var DataSetApresentado = [];    
    var TamanhoPagina = 100;
    var Pagina;
    var UltimaPagina;

    var $TableBody;
    var $InputFiltro;


    $(function () {
        d3.csv('data/dados-tp1.csv', function (dataset) {
            DataSetPrincipal = dataset;
            DataSetApresentado = DataSetPrincipal;
            PreencherTabelaComDadosIniciais();            
        });

        $TableBody = $('#main-table-body');
        $InputFiltro = $('#filter');

        $('.next').on('click', AvancarPagina);
        $('.previous').on('click', VoltarPagina);
        $('.btn-filter').on('click', Filtrar);
        $('.btn-clean-filter').on('click', LimparFiltro);
    });

    function PreencherTabelaComDadosIniciais() {
        Pagina = 1;

        var limite;

        if(DataSetApresentado.length < TamanhoPagina)
            limite = DataSetApresentado.length;
        else
            limite = TamanhoPagina;

        for(var index = 0; index < limite; index ++) {
            AdicionarLinhaNaTabela(DataSetApresentado[index]);            
        }
    }

    function AdicionarLinhaNaTabela(dadosLinha) {
        var linha = $('<tr>');

        linha.append('<td>' + dadosLinha.permalink + '</td>');                        
        linha.append('<td>' + dadosLinha.company + '</td>');
        linha.append('<td>' + dadosLinha.numEmps + '</td>');
        linha.append('<td>' + dadosLinha.category + '</td>');
        linha.append('<td>' + dadosLinha.city + '</td>');
        linha.append('<td>' + dadosLinha.state + '</td>');
        linha.append('<td>' + dadosLinha.fundedDate + '</td>');
        linha.append('<td>' + dadosLinha.raisedAmt + '</td>');
        linha.append('<td>' + dadosLinha.raisedCurrency + '</td>');
        linha.append('<td>' + dadosLinha.round + '</td>');

        $TableBody.append(linha);
    }

    function AvancarPagina() {
        if(UltimaPagina === true)
            return;

        var inicio = Pagina * TamanhoPagina;        

        Pagina += 1;

        var limite = Pagina * TamanhoPagina;    

        if(limite > DataSetApresentado.length) {
            limite = DataSetApresentado.length
            UltimaPagina = true;
        }            

        $TableBody.empty();

        for(var index = inicio; index < limite; index++) {
            AdicionarLinhaNaTabela(DataSetApresentado[index]);
        }
    }

    function VoltarPagina() {
        if(Pagina === 1)
            return;        
        
        Pagina -= 1;        

        if(UltimaPagina === true) {
            UltimaPagina = false;
        }        

        var limite = Pagina * TamanhoPagina;

        var inicio = (Pagina - 1) * TamanhoPagina;

        if(inicio < 0) {
            inicio = 0;
        }

        $TableBody.empty();

        for(var index = inicio; index < limite; index++) {
            AdicionarLinhaNaTabela(DataSetApresentado[index]);
        }
    }

    function Filtrar() {
        var termo = $InputFiltro.val();

        $TableBody.empty();
        DataSetApresentado = [];
        UltimaPagina = false;

        for(var index = 0; index < DataSetPrincipal.length; index++) {
            if(VerificarPresencaTermo(DataSetPrincipal[index], termo)) {
                DataSetApresentado.push(DataSetPrincipal[index]);
            }
        }

        PreencherTabelaComDadosIniciais();  
    }

    function LimparFiltro() {
        $TableBody.empty();
        DataSetApresentado = [];
        UltimaPagina = false;

        $InputFiltro.val('');

        DataSetApresentado = DataSetPrincipal;

        PreencherTabelaComDadosIniciais();
    }

    function VerificarPresencaTermo(dado, termo) {                
        var resultadoIndexOf;

        resultadoIndexOf = dado.permalink.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.company.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.numEmps.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.category.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.city.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.state.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.fundedDate.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.raisedAmt.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.raisedCurrency.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        resultadoIndexOf = dado.round.indexOf(termo);

        if(resultadoIndexOf !== -1)
            return true;

        return false;
    }
})();

