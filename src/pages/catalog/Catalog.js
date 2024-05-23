import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";
import queryString from 'query-string';
import {useGetAllArticlesQuery, useGetFilteredArticlesMutation} from "../../redux/api/article.api";
import {useSelector} from "react-redux";
import {filterSlice} from "../../redux/slices/filter.slice";
import {useGetCurrentUserQuery} from "../../redux/api/user.api";

export const Catalog = () => {
    const {data: articles, isFetching, error} = useGetAllArticlesQuery();
    const data = useSelector((state) => state.filter);
    const [getFilteredArticles] = useGetFilteredArticlesMutation();
    const [filteredArticles, setFilteredArticles] = useState([]);
    const {data: user, isLoading, error: userError} = useGetCurrentUserQuery();

    useEffect(() => {
        const fetchFilteredArticles = async () => {
            const result = await getFilteredArticles(data);
            setFilteredArticles(result.data);
        };

        fetchFilteredArticles();
    }, [data, getFilteredArticles]);

    return (
        <>
            {(filteredArticles?.length > 0 ? filteredArticles : articles)?.map((article, index) => (
                <CatalogPreview
                    key={index}
                    data={article}
                    link={user ? {
                        pathname: '/catalog/article',
                        search: queryString.stringify({article_id: article?.articleId}),
                    } : "/login"}
                />
            ))}
        </>
    );
};

export default withCatalogLayout(Catalog);