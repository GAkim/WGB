import SourceProductActions from 'SourceComponent/ProductActions/ProductActions.component';
import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import isMobile from 'Util/Mobile';
import { GROUPED } from 'Util/Product';

import './ProductActions.style.override';

export default class ProductActions extends SourceProductActions {
    renderNameAndBrand() {
        const {
            product: { name }
        } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'name' } }
            >
                { this.renderBrand() }
                <p block="ProductActions" elem="Title" itemProp="name">
                    <TextPlaceholder content={ name } length="medium" />
                </p>
            </section>
        );
    }

    renderBrand() {
        const {
            product: { attributes: { brand: { attribute_value: brand } = {} } = {} },
            showOnlyIfLoaded
        } = this.props;

        // display content or empty line
        const contentToShow = showOnlyIfLoaded(
            brand,
            (
                <p block="ProductActions" elem="Brand" itemProp="brand">
                    <TextPlaceholder content={ brand } />
                </p>
            )
        );

        const emptyContent = (
            <p block="ProductActions" elem="Brand" itemProp="brand">
                <br />
            </p>
        );

        return contentToShow || emptyContent;
    }

    renderNameAndPrice() {
        const {
            product: {
                name,
                price,
                variants,
                type_id
            },
            configurableVariantIndex
        } = this.props;

        if (type_id === GROUPED) return null;

        // Product in props is updated before ConfigurableVariantIndex in props, when page is opened by clicking CartItem
        // As a result, we have new product, but old configurableVariantIndex, which may be out of range for variants
        const productOrVariantPrice = variants && variants[configurableVariantIndex] !== undefined
            ? variants[configurableVariantIndex].price
            : price;

        return (
            <div block="ProductActions" elem="NameAndPrice">
                <p block="ProductActions" elem="Name">{ name }</p>
                <ProductPrice
                  price={ productOrVariantPrice }
                  mix={ { block: 'ProductActions', elem: 'Price' } }
                />
            </div>
        );
    }

    renderMobile() {
        return (
            <>
                { this.renderBrand() }
                { this.renderNameAndPrice() }
            </>
        );
    }

    renderDesktop() {
        return (
            <>
                { this.renderPrice() }
                { this.renderNameAndBrand() }
            </>
        );
    }

    render() {
        return (
            <article block="ProductActions">
                { isMobile.any()
                    ? this.renderMobile()
                    : this.renderDesktop() }
                { this.renderShortDescription() }
                <div block="ProductActions" elem="AddToCartWrapper">
                    { this.renderQuantityInput() }
                    { this.renderAddToCart() }
                    { this.renderProductWishlistButton() }
                </div>
                { this.renderReviews() }
                { this.renderSkuAndStock() }
                { this.renderConfigurableAttributes() }
                { this.renderGroupedItems() }
                { this.renderTierPrices() }
            </article>
        );
    }
}
