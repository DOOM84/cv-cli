export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/skill')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/skill', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
        return await this.$axios.$patch(`admin/skill/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },
  async delete({}, id){

        try {
           return await this.$axios.$delete(`admin/skill/${id}`);
        } catch (error) {
            throw error;
        }
    }

};

export const getters = {

  };
