import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const { searchTerm, searchValue, setIsLoading, setSearchResult } = props;
    return (
        <span className="content">
          <a href="#" onClick={async (event) => {
              event.preventDefault();
              setIsLoading(true);
              try {
                  const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                  setSearchResult(result)
              } catch(error) {
                  console.error(error) 
              } finally {
                  setIsLoading(false)
              }
          }}>{searchValue}</a>
         </span>
    )  
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const { featuredResult, setIsLoading, setSearchResult } = props;
    if ( !featuredResult ){
        return <main id="feature"></main>
    } else {
        return <main id="feature">
            <div className="object-feature">
            <header>
                <h3>{ featuredResult.title && <span>{featuredResult.title}</span> }</h3>
                <h4>{ featuredResult.dated && <span>{featuredResult.dated}</span>}</h4>
            </header>
            <section className="facts">
                <span className="title">Description</span>
                { featuredResult.description &&  <span className="content">{featuredResult.description}</span> }
                <span className="title">Culture</span>
                <Searchable searchTerm={featuredResult.culture} searchValue={featuredResult.culture} setIsLoading={setIsLoading} setSearchResult={setSearchResult} />
                <span className="title">Technique</span>
                <Searchable searchTerm={featuredResult.technique} searchValue={featuredResult.technique} setIsLoading={setIsLoading} setSearchResult={setSearchResult} />
                <span className="title">Medium</span>
                <Searchable searchTerm={featuredResult.medium} searchValue={featuredResult.medium} setIsLoading={setIsLoading} setSearchResult={setSearchResult} />
                <span className="title">Dimensions</span>
                { featuredResult.dimensions &&  <span className="content">{featuredResult.dimensions}</span> }
                <span className="title">Department</span>
                { featuredResult.department && <span className="content">{featuredResult.department}</span> }
                <span className="title">Division</span>
                { featuredResult.division &&  <span className="content">{featuredResult.division}</span> }
                <span className="title" >Contact</span>
                { featuredResult.contact && <span className="content"><a href={featuredResult.contact}>{featuredResult.contact}</a></span> }
                <span className="title">Credit</span>
                { featuredResult.creditline && <span className="content">{featuredResult.creditline}</span> }
            </section>
            <section className="photos">
                <img  src={featuredResult.primaryimageurl} alt={featuredResult.title} />
                
            </section>
            </div>
        </main>
        
    }
}

export default Feature;