export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/category')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/category', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
        return await this.$axios.$patch(`admin/category/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },
  async delete({}, id){

        try {
           return await this.$axios.$delete(`admin/category/${id}`);
        } catch (error) {
            throw error;
        }
    }

};

export const getters = {

  };
